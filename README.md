
## Converting an existing AngularJS project to TypeScript

This project is a copy of the following AngularJS/JavaScript project which has then been converted to TypeScript:

[AngularDialog](https://github.com/taylorjg/AngularDialog "AngularDialog")

I used the following project for guidance:

https://github.com/tastejs/todomvc/tree/gh-pages/labs/architecture-examples/typescript-angular

### Install TypeScript (on Visual Studio 2010 in my case)

I am currently limited to using Visual Studio 2010. I used the following instructions to get TypeScript working:

http://stackoverflow.com/questions/14510511/how-can-i-install-typescript-with-visual-studio-2010

NOTE: Must download 0.9.0.1 and not 0.9.1 because 0.9.0.1 is an msi file and 0.9.1 is an exe file.

### Changes to the project file

The above SO article shows some lines to add to existing project files. I had a problem with this line:

```
  <Import Project="$(VSToolsPath)\TypeScript\Microsoft.TypeScript.targets" />
```

The project failed to load:

```
Loading C:\Users\taylojo\Documents\Visual Studio 2010\Projects\AngularDialog-TypeScript\AngularDialog\AngularDialog.csproj ...
C:\Users\taylojo\Documents\Visual Studio 2010\Projects\AngularDialog-TypeScript\AngularDialog\AngularDialog.csproj : error  : Unable to read the project file 'AngularDialog.csproj'. 
C:\Users\taylojo\Documents\Visual Studio 2010\Projects\AngularDialog-TypeScript\AngularDialog\AngularDialog.csproj(189,3): The imported project "C:\TypeScript\Microsoft.TypeScript.targets" was not found. Confirm that the path in the <Import> declaration is correct, and that the file exists on disk.
```

I had to add this to get it working:

```
  <PropertyGroup>
    <VisualStudioVersion Condition="'$(VisualStudioVersion)' == ''">10.0</VisualStudioVersion>
    <VSToolsPath Condition="'$(VSToolsPath)' == ''">$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)</VSToolsPath>
  </PropertyGroup>
```

The project then loaded successfully. However, it failed to build properly until I added a .ts file to the project. It then worked fine.

### Converting JavaScript files to TypeScript files

I converted the .js files to .ts files one at a time starting with the simplest one.

### Compiling multiple TypeScript files to a single JavaScript file

I used information in the following article to figure out how to compile all .ts files to a single .js file:

http://www.stevefenton.co.uk/Content/Blog/Date/201301/Blog/Getting-The-Right-Set-Up-For-TypeScript/

```
  <Target Name="BeforeBuild">
    <Exec Command="tsc --out Scripts\CombinedCompiledTypeScript.js @(TypeScriptCompile ->'&quot;%(fullpath)&quot;', ' ')" />
  </Target>
```

## TODO

* Add subfolders for:
    * Models
    * Interfaces
    * Controllers
    * Directives
    * Services
* Fix grunt issues
    * Mainly related to modules...
