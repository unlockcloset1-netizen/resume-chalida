@echo off
echo ========================================
echo  Pushing to GitHub...
echo ========================================
cd /d "C:\Users\ITadmin\resume-next"

REM Delete ALL git lock files
del /f .git\index.lock 2>nul
del /f .git\HEAD.lock 2>nul
del /f .git\MERGE_HEAD.lock 2>nul
del /f .git\COMMIT_EDITMSG.lock 2>nul
del /f .git\packed-refs.lock 2>nul
del /f .git\refs\heads\main.lock 2>nul

git remote set-url origin https://github.com/ariff2006/resume-next.git
git add .
git commit -m "style: fix admin UI contrast, font-sizes, hierarchy, typos, cache control, and sync resume data"
git push origin main

echo ========================================
if %ERRORLEVEL% == 0 (
    echo  SUCCESS! Deploy in ~2 minutes.
    echo  Test: https://resume-next-blond.vercel.app/admin
) else (
    echo  ERROR: Push failed. Check credentials.
)
echo ========================================
pause
