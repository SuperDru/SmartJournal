#!/bin/bash
 
cd Configuration
echo "Host=postgres;Port=5432;Database=smart_journal;Username=postgres;Password=mydb" > DatabaseCfg.json

cd ././AttendanceAndPayments/

dockerize -timeout 300s -wait-retry-interval 3s -wait tcp://postgres:5432 dotnet publish AttendanceAndPayments/AttendanceAndPayments.csproj --output ./../dbuild

cd ../build

dotnet AttendanceAndPayments.dll
