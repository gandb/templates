param(
    [Parameter(Mandatory = $true)]
    [string]$Path
)

# Verifica se é um diretório
if (-not (Test-Path $Path -PathType Container)) {
    Write-Error "Erro: o caminho informado não é uma pasta válida."
    exit 1
}

# Remove barra final se existir
$Path = (Get-Item $Path).FullName

# Nome da pasta a ser compactada
$FolderName = Split-Path $Path -Leaf

# Pasta onde o .zip será salvo (pasta pai)
$ParentFolder = Split-Path $Path -Parent

$DatePrefix = Get-Date -Format "yyyyMMddHHmmss"

$ZipName = "$DatePrefix$FolderName.zip"
$ZipPath = Join-Path $ParentFolder $ZipName

# Compacta usando Compress-Archive
try {
    Compress-Archive -Path "$Path\*" -DestinationPath $ZipPath -Force
    Write-Output "Compactação concluída: $ZipPath"
} catch {
    Write-Error "Erro ao compactar a pasta: $_"
    exit 2
}
