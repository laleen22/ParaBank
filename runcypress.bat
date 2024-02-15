@echo off
REM Navigate to the directory where your Cypress project is located
cd C:\Users\laleen\CypressAutomation

REM Run Cypress tests using the installed binary
npx cypress run --browser chrome

REM Pause the script so that you can see the output before the console window closes
pause