## Laboratuvar Raporlama Uygulaması

# Kullanılan Teknolojiler
* ReactJs
* Spring Boot
* Spring Data JPA
* Maven
* Bootstrap
* Lombok

https://user-images.githubusercontent.com/58556840/221588913-dad4ef84-1890-476a-a903-e7e8a11abd74.mp4

## Kurulum ve Çalıştırma

* Proje kurulumu için aşağıdaki gerekli adımları sırayla uygulamanız gerekmektedir.

## Editör Kurulumu
* [Intellij IDEA Ultimate] - editörünü kurmanız gerekmektedir.
* [Java JDK 11] - en az kurulu olması gerekmektedir.
* [MySQL] - kurulması gerekmektedir.

MySQL Workbench üzerinden report-test-db adında bir veritabanı oluşturmalısınız.
LabOzgurYazilim/ klasörü içerisindeki spring boot projesine girerek ""application.properties"" içerisindeki
```
spring.datasource.url=
spring.datasource.username=
spring.datasource.password=
```
alanlarını düzenlemeniz gerekmektedir.

Aşağıdaki kod ile projeyi kendi kişisel bilgisayarınıza klonlayabilirsiniz.

```
git clone https://github.com/AktanSN/LabReportApp.git
```

Klonladıktan sonra terminalden LabOzgurYazilim/ klasörü içerisine giderek 
``
mvn spring-boot:run
``
kodunu çalıştırarak projeyi başlatabilirsiniz. Spring Boot tarafında proje 8081 portunda çalışmaktadır.

Ardından front/lab-report-app/ klasörüne giderek
``
npm i
``
``
npm start
``
adımlarını izleyerek React uygulamasını ayağa kaldırabilirsiniz.





## Proje İçeriği
Bu projede front-end tarafında ReactJs, back-end tarafında Spring Boot kullanılmıştır. ReactJs içerisinde hooks'lar, istekler için axios, yönlendirmeler için react-router-dom, tasarımda yardım etmesi açısından bootstrap kütüphanesinden yararlanılmıştır. Spring Boot tarafında kullandığımız dependency'ler Spring Web, Spring Boot DevTools, MySQL Driver, Spring Data JPA ve Lombok'tur.




