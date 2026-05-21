# Auto-Commit Script for Forge Rules v3.0
# Generates professional commit messages based on changes

param(
    [string]$CustomMessage = ""
)

Write-Host "Forge Rules Smart Auto-Commit" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Check git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not a git repository" -ForegroundColor Red
    exit 1
}

# Get status
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit" -ForegroundColor Green
    exit 0
}

# Count changes
$newCount = ($status | Select-String "^\?\?" | Measure-Object).Count
$modCount = ($status | Select-String "^ M" | Measure-Object).Count
$delCount = ($status | Select-String "^ D" | Measure-Object).Count

Write-Host "Changes detected:" -ForegroundColor Yellow
Write-Host "  New: $newCount" -ForegroundColor Green
Write-Host "  Modified: $modCount" -ForegroundColor Yellow
Write-Host "  Deleted: $delCount" -ForegroundColor Red
Write-Host ""

# Generate commit message
if ($CustomMessage) {
    $message = $CustomMessage
} else {
    # Detect type based on files
    $allChanges = $status -join " "
    
    if ($allChanges -match "workflow") {
        $type = "feat(workflows)"
        $desc = "add situational workflow files"
    }
    elseif ($allChanges -match "agents/") {
        $type = "feat(agents)"
        $desc = "enhance agent specifications"
    }
    elseif ($allChanges -match "config/") {
        $type = "feat(config)"
        $desc = "add routing configuration"
    }
    elseif ($allChanges -match "\.md") {
        $type = "docs"
        $desc = "update documentation"
    }
    else {
        $type = "chore(v3.0)"
        $desc = "implementation progress"
    }
    
    $message = "${type}: ${desc}`n`nFiles changed: $($newCount + $modCount + $delCount)"
}

Write-Host "Commit message:" -ForegroundColor Cyan
Write-Host $message -ForegroundColor White
Write-Host ""

# Stage, commit, push
git add .
git commit -m $message

if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Successfully pushed!" -ForegroundColor Green
        Write-Host "View at: https://github.com/SIRAJcrypto11/forge-rules" -ForegroundColor Cyan
    } else {
        Write-Host "Push failed" -ForegroundColor Red
    }
} else {
    Write-Host "Commit failed" -ForegroundColor Red
}
