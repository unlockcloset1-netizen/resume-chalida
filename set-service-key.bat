@echo off
echo ========================================
echo  Setting SUPABASE_SERVICE_ROLE_KEY...
echo ========================================
cd /d "C:\Users\ITadmin\resume-next"

REM Remove existing key if any (ignore errors)
vercel env rm SUPABASE_SERVICE_ROLE_KEY production --yes 2>nul
vercel env rm SUPABASE_SERVICE_ROLE_KEY preview --yes 2>nul
vercel env rm SUPABASE_SERVICE_ROLE_KEY development --yes 2>nul

REM Add key from clipboard to all environments
echo Adding to production...
powershell -command "Get-Clipboard" | vercel env add SUPABASE_SERVICE_ROLE_KEY production

echo Adding to preview...
powershell -command "Get-Clipboard" | vercel env add SUPABASE_SERVICE_ROLE_KEY preview

echo Adding to development...
powershell -command "Get-Clipboard" | vercel env add SUPABASE_SERVICE_ROLE_KEY development

echo ========================================
echo  Redeploying to production...
echo ========================================
vercel --prod --yes

echo ========================================
if %ERRORLEVEL% == 0 (
    echo  DONE! Upload + Save should work now.
    echo  Test: https://resume-next-blond.vercel.app/admin
) else (
    echo  ERROR: Something failed.
)
echo ========================================
pause
