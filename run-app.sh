#!/bin/bash
 
cd Common

dockerize -timeout 300s -wait-retry-interval 3s -wait tcp://postgres:5432 dotnet ef database update

cd ../StudentsSystem

dotnet publish StudentsSystem.csproj --output ./../build

cd ../build

dotnet StudentsSystem.dll
