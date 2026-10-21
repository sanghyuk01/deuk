@echo off
setlocal
set "deuk_runtime=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies"
if not exist "%deuk_runtime%\node\bin\node.exe" (
  echo Node.js runtime was not found. Install Node.js and pnpm to run this project.
  exit /b 1
)
if not exist "%deuk_runtime%\node\node_modules\pnpm\bin\pnpm.mjs" (
  echo pnpm runtime was not found. Install pnpm to run this project.
  exit /b 1
)
set "PATH=%deuk_runtime%\node\bin;%PATH%"
pushd "%~dp0"
"%deuk_runtime%\node\bin\node.exe" "%deuk_runtime%\node\node_modules\pnpm\bin\pnpm.mjs" %*
set "deuk_exit=%ERRORLEVEL%"
popd
exit /b %deuk_exit%
