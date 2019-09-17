#!/bin/bash
 
cd Configuration
echo "{ \"ConnectionString\": \"Host=postgres;Port=5432;Database=smart_journal;Username=postgres;Password=mydb\" }" > DatabaseCfg.json

cd ../Storage

dockerize -timeout 300s -wait-retry-interval 3s -wait tcp://postgres:5432 dotnet ef database update

cd ../StudentsSystem

dotnet publish StudentsSystem.csproj --output ./../build

cd ../build

dotnet StudentsSystem.dll
