#!/bin/bash 

echo "{ \"ConnectionString\": \"Host=postgres;Port=5432;Database=smart_journal;Username=postgres;Password=mydb\" }" > Configuration/DatabaseCfg.json

dockerize -timeout 300s -wait-retry-interval 3s -wait tcp://postgres:5432 dotnet publish AttendanceAndPayments/AttendanceAndPayments.csproj --output ./../build

cd build
dotnet AttendanceAndPayments.dll
