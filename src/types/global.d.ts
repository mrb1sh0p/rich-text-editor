declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  declare module '*.svg' {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }