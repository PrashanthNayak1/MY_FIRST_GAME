@echo off
echo ==============================================
echo 🔧 React Native Build Fix Script (Windows)
echo ==============================================

REM Step 1: Kill Metro Bundler if stuck
echo Killing Metro Bundler on port 8081...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081') do taskkill /PID %%a /F >nul 2>&1

REM Step 2: Clean Android build
cd android
echo Running Gradle clean...
call .\gradlew clean
cd ..

REM Step 3: Remove generated autolinking files (where LegacyArchitectureLogger appears)
echo Removing generated autolinking files...
rmdir /s /q android\app\build\generated\autolinking

REM Step 4: Disable New Architecture permanently
echo Ensuring newArchEnabled=false in gradle.properties...
findstr /C:"newArchEnabled=false" android\gradle.properties >nul || echo newArchEnabled=false>> android\gradle.properties

REM Step 5: Clear Metro + React Native cache
echo Clearing Metro and React Native cache...
call npx react-native start --reset-cache

REM Step 6: Re-run Android build
echo Starting Android build...
call npx react-native run-android

echo ==============================================
echo ✅ Build process complete. Check for errors.
echo ==============================================
pause
