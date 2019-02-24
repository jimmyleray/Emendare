export interface IRoute {
  name: string;
  path: string | ((id?: string) => string);
  exact?: boolean;
  private?: boolean;
  component?: any;
}
