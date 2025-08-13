import { PathUtils } from "./path.utils";

 

describe('PathUtils Test', () => {
   
  beforeEach(() => {
   });

   it('A simple connection', () => {
    expect(PathUtils.join("http://localhost:80","v1/metadata/increment")).toEqual("http://localhost:80/v1/metadata/increment");
  });
  it('A connection with separators', () => {
    expect(PathUtils.join("http://localhost:80/","/v1/metadata/increment/")).toEqual("http://localhost:80/v1/metadata/increment");
  });
});
