@echo off
echo Starting AI Image Studio with optimized memory (2GB)...
echo Memory optimization: ENABLED
echo Lazy loading: ENABLED
echo Source maps: DISABLED
echo.
set NODE_OPTIONS=--max-old-space-size=2048
npx ng serve --configuration development --host 0.0.0.0 --port 4200 %*
