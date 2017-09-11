/**
 * Created by nursultan on 9/11/17.
 */
export class TeamMember {
  public name:string;
  public lastname:string;
  public title:string;
  public facebook:string;
  public linkedin:string;
  public profile:string;

  public constructor(name:string, lastname:string, title:string, facebook:string, linkedin:string, profile:string) {
    this.name = name;
    this.lastname = lastname;
    this.title = title;
    this.facebook = facebook;
    this.linkedin = linkedin;
    this.profile = profile;
  }
}
