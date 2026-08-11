@echo off
setlocal
pushd "%~dp0"

set "APP_NAME=Mahmoud Studio"
set "HEALTH_URL=http://127.0.0.1:3000/"
set "APP_URL=http://localhost:3000/studio"
set "NEXTAUTH_URL=http://localhost:3000"
set "STUDIO_LOCAL_PREVIEW=1"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js and npm are required.
  echo Install Node.js LTS from https://nodejs.org/ then run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing project dependencies for the first time...
  call npm.cmd ci
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

powershell.exe -NoProfile -Command "try { $r=Invoke-WebRequest -Uri '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } } catch {}; exit 1"
if errorlevel 1 (
  echo Starting %APP_NAME% locally...
  start "%APP_NAME% local server" /D "%~dp0" cmd.exe /k "npm.cmd run dev -- -H 127.0.0.1 -p 3000"
)

powershell.exe -NoProfile -Command "$deadline=(Get-Date).AddSeconds(120); do { try { $r=Invoke-WebRequest -Uri '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } } catch {}; Start-Sleep -Milliseconds 500 } while ((Get-Date) -lt $deadline); exit 1"
if errorlevel 1 (
  echo The local site did not start. Check the server window for details.
  pause
  exit /b 1
)

if /I not "%NO_BROWSER%"=="1" start "" "%APP_URL%"
echo Local studio: %APP_URL%

popd
endlocal
