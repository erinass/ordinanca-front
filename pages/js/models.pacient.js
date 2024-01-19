class Pacienti{
    constructor(
        id,
        name,
        age,
        city,
        email,
        createdAt= new Date(),
        reports

    )  
    { 
    this.id = id;
    this.name = name;
    this.age = age;
    this.city = city;
    this.email = email;
    this.createdAt = createdAt;
    this.reports = reports;

    }
}