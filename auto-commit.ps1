# ============================================================
#  Forge Rules - Smart Auto-Commit v2.0
#  Handles: stash -> pull -> rebase/merge -> push
#  Generates professional Conventional Commit messages
# ============================================================

param(
    [string]$CustomMessage = "",
    [switch]$DryRun,
    [switch]$Verbose
)

# ── Helpers ─────────────────────────────────────────────────
function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host "  [$Text]" -ForegroundColor Cyan
    Write-Host "  $("-" * ($Text.Length + 2))" -ForegroundColor DarkCyan
}

function Write-Step {
    param([string]$Icon, [string]$Text, [string]$Color = "White")
    Write-Host "  $Icon  $Text" -ForegroundColor $Color
}

function Write-OK   { param([string]$Text) Write-Host "  [OK]  $Text" -ForegroundColor Green }
function Write-Warn { param([string]$Text) Write-Host "  [!!]  $Text" -ForegroundColor Yellow }
function Write-Err  { param([string]$Text) Write-Host "  [XX]  $Text" -ForegroundColor Red }
function Write-Info { param([string]$Text) Write-Host "  [..]  $Text" -ForegroundColor DarkGray }

function Invoke-Git {
    param([string[]]$GitArgs, [switch]$Silent)
    if ($Verbose -and -not $Silent) {
        Write-Info "git $($GitArgs -join ' ')"
    }
    $result = & git @GitArgs 2>&1
    return @{ Output = $result; ExitCode = $LASTEXITCODE }
}

# ── Banner ───────────────────────────────────────────────────
Write-Host ""
Write-Host "  +==========================================+" -ForegroundColor Cyan
Write-Host "  |  Forge Rules - Smart Auto-Commit v2.0   |" -ForegroundColor Cyan
Write-Host "  +==========================================+" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Warn "DRY RUN mode - no changes will be committed or pushed"
}

# ── 1. Validate git repo ─────────────────────────────────────
Write-Header "Step 1 - Validating Repository"

if (-not (Test-Path ".git")) {
    Write-Err "Not a git repository. Run this script from the repo root."
    exit 1
}

$remoteCheck = Invoke-Git -GitArgs @("remote", "get-url", "origin") -Silent
if ($remoteCheck.ExitCode -ne 0) {
    Write-Err "No remote 'origin' configured. Cannot pull or push."
    exit 1
}

$currentBranch = (Invoke-Git -GitArgs @("rev-parse", "--abbrev-ref", "HEAD") -Silent).Output
Write-OK "Repository OK - branch: $currentBranch"

# ── 2. Detect local changes ──────────────────────────────────
Write-Header "Step 2 - Detecting Local Changes"

$statusRaw = (Invoke-Git -GitArgs @("status", "--porcelain") -Silent).Output
$hasLocalChanges = -not [string]::IsNullOrWhiteSpace($statusRaw)

if ($hasLocalChanges) {
    $lines     = @($statusRaw -split "`n" | Where-Object { $_ -ne "" })
    $newFiles  = @($lines | Where-Object { $_ -match "^\?\?" })
    $modified  = @($lines | Where-Object { $_ -match "^.M|^M." })
    $deleted   = @($lines | Where-Object { $_ -match "^.D|^D." })
    $renamed   = @($lines | Where-Object { $_ -match "^R" })

    Write-Step "+" "New files  : $($newFiles.Count)"  "Green"
    Write-Step "~" "Modified   : $($modified.Count)"  "Yellow"
    Write-Step "-" "Deleted    : $($deleted.Count)"   "Red"
    Write-Step ">" "Renamed    : $($renamed.Count)"   "Magenta"
    Write-Host ""
} else {
    Write-OK "Working tree is clean - nothing to commit"
    exit 0
}

# ── 3. Stash local changes before pull ───────────────────────
Write-Header "Step 3 - Stashing Local Changes"

$stashApplied = $false
$stashLabel   = "auto-commit-stash-$(Get-Date -Format 'yyyyMMdd-HHmmss')"

$stashResult = Invoke-Git -GitArgs @("stash", "push", "-u", "-m", $stashLabel)

if ($stashResult.ExitCode -eq 0) {
    if ($stashResult.Output -match "No local changes") {
        Write-Info "Nothing to stash (already clean)"
    } else {
        $stashApplied = $true
        Write-OK "Local changes stashed safely as: $stashLabel"
    }
} else {
    Write-Warn "Stash failed - proceeding without stash"
    Write-Info $stashResult.Output
}

# ── 4. Fetch & check remote status ───────────────────────────
Write-Header "Step 4 - Checking Remote Status"

$fetchResult = Invoke-Git -GitArgs @("fetch", "origin", $currentBranch)

if ($fetchResult.ExitCode -ne 0) {
    Write-Warn "Fetch failed (offline or auth issue) - skipping pull"
    Write-Info $fetchResult.Output

    # Restore stash and continue with local commit only
    if ($stashApplied) {
        $popResult = Invoke-Git -GitArgs @("stash", "pop")
        if ($popResult.ExitCode -eq 0) {
            Write-OK "Stash restored - will commit locally without pull"
        }
    }
} else {
    $behindRaw = (Invoke-Git -GitArgs @("rev-list", "--count", "HEAD..origin/$currentBranch") -Silent).Output
    $aheadRaw  = (Invoke-Git -GitArgs @("rev-list", "--count", "origin/$currentBranch..HEAD") -Silent).Output
    $behindCount = [int]($behindRaw.Trim())
    $aheadCount  = [int]($aheadRaw.Trim())

    $behindColor = if ($behindCount -gt 0) { "Yellow" } else { "Green" }
    $aheadColor  = if ($aheadCount -gt 0)  { "Cyan"   } else { "Green" }

    Write-Step "v" "Behind remote : $behindCount commit(s)" $behindColor
    Write-Step "^" "Ahead remote  : $aheadCount commit(s)"  $aheadColor

    # ── 5. Pull if behind ────────────────────────────────────
    if ($behindCount -gt 0) {
        Write-Header "Step 5 - Pulling Remote Changes"

        # Try rebase first (cleaner history)
        $pullResult = Invoke-Git -GitArgs @("pull", "--rebase", "origin", $currentBranch)

        if ($pullResult.ExitCode -eq 0) {
            Write-OK "Pulled and rebased $behindCount commit(s) from origin/$currentBranch"
        } else {
            Write-Warn "Rebase failed - attempting merge pull"

            # Abort rebase if in progress
            Invoke-Git -GitArgs @("rebase", "--abort") -Silent | Out-Null

            $mergePull = Invoke-Git -GitArgs @("pull", "--no-rebase", "origin", $currentBranch)

            if ($mergePull.ExitCode -eq 0) {
                Write-OK "Merged remote changes successfully"
            } else {
                Write-Err "Pull failed - possible merge conflict detected"
                Write-Info $mergePull.Output

                # Restore stash before exiting
                if ($stashApplied) {
                    Write-Warn "Restoring your stashed changes..."
                    Invoke-Git -GitArgs @("stash", "pop") -Silent | Out-Null
                    Write-OK "Stash restored"
                }

                Write-Host ""
                Write-Err "ACTION REQUIRED - Resolve conflicts manually:"
                Write-Step "1." "Run: git status" "Yellow"
                Write-Step "2." "Open and fix conflict markers in affected files" "Yellow"
                Write-Step "3." "Run: git add ." "Yellow"
                Write-Step "4." "Run: git rebase --continue  (or: git merge --continue)" "Yellow"
                Write-Step "5." "Re-run this script" "Yellow"
                exit 1
            }
        }
    } else {
        Write-Header "Step 5 - Pull Check"
        Write-OK "Already up to date with origin/$currentBranch"
    }

    # ── 6. Restore stash ─────────────────────────────────────
    if ($stashApplied) {
        Write-Header "Step 6 - Restoring Local Changes"

        $popResult = Invoke-Git -GitArgs @("stash", "pop")

        if ($popResult.ExitCode -eq 0) {
            Write-OK "Local changes restored from stash"
        } else {
            Write-Err "Stash pop failed - possible conflict after pull"
            Write-Info $popResult.Output
            Write-Host ""
            Write-Warn "Your changes are still in stash."
            Write-Warn "Run: git stash show -p   to inspect"
            Write-Warn "Run: git stash drop      after resolving"
            exit 1
        }
    }
}

# ── 7. Build commit message ───────────────────────────────────
Write-Header "Step 7 - Building Commit Message"

if ($CustomMessage) {
    $commitMsg = $CustomMessage
    Write-Info "Using custom message"
} else {
    # Re-read status after pull+pop
    $statusRaw2   = (Invoke-Git -GitArgs @("status", "--porcelain") -Silent).Output
    $changedFiles = @($statusRaw2 -split "`n" | Where-Object { $_ -ne "" })
    $totalCount   = $changedFiles.Count
    $allChanges   = $changedFiles -join " "

    # Extract clean file paths
    $fileList = $changedFiles | ForEach-Object {
        if ($_.Length -gt 3) { $_.Substring(3).Trim() } else { "" }
    } | Where-Object { $_ -ne "" }

    # Detect commit type and scope (priority order)
    $type  = "chore"
    $scope = ""
    $desc  = "update project files"

    if ($allChanges -match "workflows/") {
        $type  = "feat"
        $scope = "workflows"
        $wfNames = ($fileList | Where-Object { $_ -match "workflows/" } | ForEach-Object {
            [System.IO.Path]::GetFileNameWithoutExtension($_) -replace "^\d+-", ""
        }) -join ", "
        $desc = "add situational workflow: $wfNames"
    }
    elseif ($allChanges -match "agents/") {
        $type  = "feat"
        $scope = "agents"
        $agentNames = ($fileList | Where-Object { $_ -match "agents/" } | ForEach-Object {
            [System.IO.Path]::GetFileNameWithoutExtension($_)
        }) -join ", "
        $desc = "enhance agent specs: $agentNames"
    }
    elseif ($allChanges -match "kiro-skills/") {
        $type  = "feat"
        $scope = "skills"
        $skillNames = ($fileList | Where-Object { $_ -match "kiro-skills/" } | ForEach-Object {
            ($_ -split "/")[1]
        } | Select-Object -Unique) -join ", "
        $desc = "add Kiro skill wrappers: $skillNames"
    }
    elseif ($allChanges -match "config/") {
        $type  = "feat"
        $scope = "config"
        $desc  = "update routing configuration"
    }
    elseif ($allChanges -match "utils/") {
        $type  = "feat"
        $scope = "utils"
        $desc  = "add utility modules"
    }
    elseif ($allChanges -match "tests/") {
        $type  = "test"
        $scope = "router"
        $desc  = "add test coverage"
    }
    elseif ($allChanges -match "examples/") {
        $type  = "docs"
        $scope = "examples"
        $desc  = "add usage examples"
    }
    elseif ($allChanges -match "checklists/") {
        $type  = "docs"
        $scope = "checklists"
        $desc  = "update checklists"
    }
    elseif ($allChanges -match "\.github/") {
        $type  = "ci"
        $scope = "github"
        $desc  = "update CI/CD configuration"
    }
    elseif ($allChanges -match "README") {
        $type  = "docs"
        $scope = "readme"
        $desc  = "improve documentation"
    }
    elseif ($allChanges -match "CHANGELOG") {
        $type  = "docs"
        $scope = "changelog"
        $desc  = "update changelog"
    }
    elseif ($allChanges -match "\.ps1") {
        $type  = "chore"
        $scope = "scripts"
        $desc  = "improve automation scripts"
    }
    elseif ($allChanges -match "\.json") {
        $type  = "chore"
        $scope = "config"
        $desc  = "update configuration files"
    }
    elseif ($allChanges -match "\.md") {
        $type  = "docs"
        $desc  = "update documentation"
    }

    # Assemble header
    $scopePart = if ($scope) { "($scope)" } else { "" }
    $header    = "${type}${scopePart}: ${desc}"

    # Body: list changed files (max 8)
    $bodyLines = @("", "Changes ($totalCount file(s)):")
    $displayFiles = $fileList | Select-Object -First 8
    foreach ($f in $displayFiles) {
        $statusLine = $changedFiles | Where-Object { $_ -match [regex]::Escape($f) } | Select-Object -First 1
        $icon = switch -Regex ($statusLine) {
            "^\?\?" { "+" }
            "^.M|^M" { "~" }
            "^.D|^D" { "-" }
            "^R"     { ">" }
            default  { "*" }
        }
        $bodyLines += "  $icon $f"
    }
    if ($totalCount -gt 8) {
        $bodyLines += "  ... and $($totalCount - 8) more file(s)"
    }

    $commitMsg = $header + ($bodyLines -join "`n")
}

Write-Host ""
Write-Host "  +------------------------------------------+" -ForegroundColor DarkCyan
($commitMsg -split "`n") | ForEach-Object { Write-Host "  | $_" -ForegroundColor White }
Write-Host "  +------------------------------------------+" -ForegroundColor DarkCyan

# ── 8. Stage & Commit ────────────────────────────────────────
Write-Header "Step 8 - Staging and Committing"

if ($DryRun) {
    Write-Warn "DRY RUN - skipping git add / commit / push"
    exit 0
}

$addResult = Invoke-Git -GitArgs @("add", ".")
if ($addResult.ExitCode -ne 0) {
    Write-Err "git add failed"
    exit 1
}
Write-OK "All changes staged"

$commitResult = Invoke-Git -GitArgs @("commit", "-m", $commitMsg)
if ($commitResult.ExitCode -ne 0) {
    Write-Err "Commit failed"
    Write-Info $commitResult.Output
    exit 1
}

$shortHash = (Invoke-Git -GitArgs @("rev-parse", "--short", "HEAD") -Silent).Output.Trim()
Write-OK "Committed -> $shortHash"

# ── 9. Push ──────────────────────────────────────────────────
Write-Header "Step 9 - Pushing to GitHub"

$pushResult = Invoke-Git -GitArgs @("push", "origin", $currentBranch)

if ($pushResult.ExitCode -eq 0) {
    Write-OK "Pushed to origin/$currentBranch"
    Write-Host ""
    Write-Host "  +==========================================+" -ForegroundColor Green
    Write-Host "  |  Done! View at:                         |" -ForegroundColor Green
    Write-Host "  |  https://github.com/SIRAJcrypto11/      |" -ForegroundColor Cyan
    Write-Host "  |  forge-rules                            |" -ForegroundColor Cyan
    Write-Host "  +==========================================+" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Err "Push failed"
    Write-Info $pushResult.Output

    # Handle race condition: remote got new commits between our pull and push
    if ($pushResult.Output -match "rejected|non-fast-forward|fetch first") {
        Write-Warn "Remote has new commits (race condition) - re-syncing..."
        Write-Host ""

        $pullRetry = Invoke-Git -GitArgs @("pull", "--rebase", "origin", $currentBranch)
        if ($pullRetry.ExitCode -eq 0) {
            Write-OK "Rebased on latest remote - retrying push"
            $pushRetry = Invoke-Git -GitArgs @("push", "origin", $currentBranch)
            if ($pushRetry.ExitCode -eq 0) {
                Write-OK "Push succeeded on retry"
                Write-Host ""
                Write-Host "  View at: https://github.com/SIRAJcrypto11/forge-rules" -ForegroundColor Cyan
            } else {
                Write-Err "Push still failing after retry. Check auth or branch protection rules."
                exit 1
            }
        } else {
            Write-Err "Rebase on retry failed. Resolve conflicts manually."
            exit 1
        }
    } else {
        Write-Err "Unexpected push error. Check network or credentials."
        exit 1
    }
}
