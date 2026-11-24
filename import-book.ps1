param([Parameter(Mandatory=$true)][string]$Pdf,[string]$Pdftoppm='')
$ErrorActionPreference='Stop'
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
if(!(Test-Path -LiteralPath $Pdf)){throw '找不到PDF。请使用同版 NCL-004652747 原书。'}
if(!$Pdftoppm){$found=Get-Command pdftoppm -ErrorAction SilentlyContinue;if($found){$Pdftoppm=$found.Source}else{$Pdftoppm='C:/Users/huang/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe'}}
if(!(Test-Path -LiteralPath $Pdftoppm)){throw '请安装Poppler，或用 -Pdftoppm 指定 pdftoppm.exe。'}
Add-Type -AssemblyName System.Drawing
$numbers=@(70..79)+@(151..160);$manifest=@{}
foreach($n in $numbers){
 $name='xinan-caifenglu-p'+$n.ToString('000');$prefix=Join-Path $project "assets/book/$name"
 & $Pdftoppm -f ($n+18) -l ($n+18) -singlefile -scale-to 2000 -png $Pdf $prefix
 if($LASTEXITCODE -ne 0){throw "无法渲染原书候选第$n 页"}
 $im=[Drawing.Image]::FromFile("$prefix.png");$h=600;$w=[int]($im.Width*$h/$im.Height);$small=New-Object Drawing.Bitmap($w,$h);$g=[Drawing.Graphics]::FromImage($small);$g.InterpolationMode='HighQualityBicubic';$g.DrawImage($im,0,0,$w,$h);$small.Save((Join-Path $project "assets/thumbs/$name.jpg"),[Drawing.Imaging.ImageFormat]::Jpeg);$g.Dispose();$small.Dispose();$im.Dispose()
 $manifest["$n"]=@{src="assets/book/$name.png";thumb="assets/thumbs/$name.jpg";available=$true;thumbnailOnly=$false;pdfPage=$n+18;width=$w;height=$h}
}
$json=$manifest|ConvertTo-Json -Depth 4
$code="// 同版PDF候选页；必须逐张核对印刷页码。`nconst importedPages=$json;`nfor(const [n,p] of Object.entries(importedPages))Object.assign(window.MOON_DATA.pages[n],p);"
[IO.File]::WriteAllText((Join-Path $project 'pages.generated.js'),$code,(New-Object Text.UTF8Encoding($false)))
Write-Output '已生成20张本地扫描页和缩略图。下一步：逐页核对印刷页码，并在 data.js 中设置 verified 和 annotations。'
