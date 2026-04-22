@echo off
title RyuBot - Sistema de Chatbot
color 0A

:menu
cls
echo ===================================================
echo                 SISTEMA RYUBOT
echo ===================================================
echo.
echo  [1] Entrenar el modelo (rasa train)
echo  [2] Iniciar solo el servidor de acciones
echo  [3] Iniciar solo el servidor principal de Rasa
echo  [4] Iniciar solo la interfaz de usuario
echo  [5] Iniciar todo el sistema (sin entrenar)
echo  [6] Iniciar todo (entrenar + iniciar todo)
echo  [0] Salir
echo.
echo ===================================================
echo.

set /p opcion="Seleccione una opcion: "

if "%opcion%"=="1" goto entrenar
if "%opcion%"=="2" goto acciones
if "%opcion%"=="3" goto rasa
if "%opcion%"=="4" goto interfaz
if "%opcion%"=="5" goto todo
if "%opcion%"=="6" goto completo
if "%opcion%"=="0" goto salir

echo Opcion invalida. Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:entrenar
cls
echo Entrenando el modelo de Rasa...
cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA
call rasa train --domain data
echo.
echo Entrenamiento completado. Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:acciones
cls
echo Iniciando el servidor de acciones...
start cmd /k "cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA && rasa run actions"
echo.
echo Servidor de acciones iniciado en una nueva ventana.
echo Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:rasa
cls
echo Iniciando el servidor principal de Rasa...
start cmd /k "cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA && rasa run --enable-api --cors "*""
echo.
echo Servidor principal de Rasa iniciado en una nueva ventana.
echo Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:interfaz
cls
echo Iniciando la interfaz de usuario...
start cmd /k "cd /d Z:\VERSION-BOT\templates\my-auth-app && npm run dev"
echo.
echo Interfaz de usuario iniciada en una nueva ventana.
echo Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:todo
cls
echo Iniciando todo el sistema (sin entrenar)...
echo.
echo 1. Iniciando servidor de acciones...
start cmd /k "cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA && rasa run actions"
timeout /t 2 > nul
echo 2. Iniciando servidor principal de Rasa...
start cmd /k "cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA && rasa run --enable-api --cors "*""
timeout /t 2 > nul
echo 3. Iniciando interfaz de usuario...
start cmd /k "cd /d Z:\VERSION-BOT\templates\my-auth-app && npm run dev"
echo.
echo Todo el sistema ha sido iniciado.
echo Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:completo
cls
echo Iniciando todo el sistema (con entrenamiento)...
echo.
echo 1. Entrenando el modelo...
cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA
call rasa train --domain data
echo.
echo 2. Iniciando servidor de acciones...
start cmd /k "cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA && rasa run actions"
timeout /t 2 > nul
echo 3. Iniciando servidor principal de Rasa...
start cmd /k "cd /d Z:\VERSION-BOT\my-ryubot\UI-RASA && rasa run --enable-api --cors "*""
timeout /t 2 > nul
echo 4. Iniciando interfaz de usuario...
start cmd /k "cd /d Z:\VERSION-BOT\templates\my-auth-app && npm run dev"
echo.
echo Entrenamiento e inicio del sistema completo finalizado.
echo Presione cualquier tecla para volver al menu.
pause > nul
goto menu

:salir
exit