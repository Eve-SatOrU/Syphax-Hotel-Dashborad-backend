# Server side (Node.js)
 ## from hackthon
 ### working on it 

## User Model (done)
 username, picture, birthday, password, email, status.
Relationships: Users can have bookings also related to the date of the booking 

## Booking Model (done)
username, status (pending, done, canceled, unverified), date, room number.
Relationships: Bookings are associated with a user, and they are related to rooms

## Room Model (done)
name, type (single bed, double bed, etc.), capacity (1 person, 2 persons), availability.
Relationships: Rooms can have single bookings.


## Admin 
login (done)
logout (done)
delete user (done)


## User (optional )
register (done)
login (done)
logout (done)



## Room 
create room (done)
View all rooms (done)
Book a room (changing its availability status) (done)



## Booking 
Create a booking (associating a user, room, and date)  (done)
Delete a booking (done)
View bookings (possibly filtered by status) (done)
