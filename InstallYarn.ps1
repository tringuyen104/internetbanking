Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

if (!(Test-Path -Path "$PSScriptRoot\~"))
{
    New-Item -Path "$PSScriptRoot\~" -ItemType "directory" -Force | Out-Null
} 

$download = [pscustomobject]@{
    name="Yarn"; 
    uri="https://yarnpkg.com/latest.msi"; 
    output="$PSScriptRoot\yarn.msi"
}

$installs =  @( [pscustomobject] @{
    name="Yarn"; 
    path="msiexec.exe"; 
    args="/i " + $download.output + " /passive /norestart"
})

# User TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

#download
if ($download.uri) {
    "Downloading " + $download.name + " ..."
    if (!(Test-Path -Path $download.output))
    {
        (New-Object System.Net.WebClient).DownloadFile($download.uri, $download.output) | Out-Null
    }
}

#install 
$installs | ForEach-Object -Process {
    if ($_.path) {
        "Installing " + $_.name + " " + $_.path + " " + $_.args + " ..."
        if (!(Test-Path -Path "$PSScriptRoot\~\status\installed.$($_.name)"))
        {
            if ($_.args) {
                Start-Process -Wait -FilePath $_.path -ArgumentList $_.args -PassThru | Out-Null
            }
            else {
                Start-Process -Wait -FilePath $_.path -PassThru | Out-Null
            }
            New-Item -Path "$PSScriptRoot\~\status\installed.$($_.name)" -ItemType "file" -Force | Out-Null
        }
    }
}

#Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

#choco install yarn --yes