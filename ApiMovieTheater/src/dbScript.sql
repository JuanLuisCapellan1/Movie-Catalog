use MovieTheater;

DROP TABLE IF EXISTS movie_categories;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS categories;


CREATE TABLE categories (
    categoryID INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


CREATE TABLE movies (
    movieID INT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(max) NOT NULL,
    poster VARCHAR(250) NOT NULL,
    rating DECIMAL(3, 2) NOT NULL
);


CREATE TABLE movie_categories (
    movieID INT NOT NULL,
    categoryID INT NOT NULL,
    PRIMARY KEY (movieID, categoryID),
    CONSTRAINT FK_MovieCategories_Movies FOREIGN KEY (movieID) REFERENCES movies(movieID),
    CONSTRAINT FK_MovieCategories_Categories FOREIGN KEY (categoryID) REFERENCES categories(categoryID)
);

INSERT INTO categories (categoryID, name) VALUES
(1, 'Action'),
(2, 'Sci-Fi'),
(3, 'Comedy'),
(4, 'Adventure'),
(5, 'Drama'),
(6, 'Horror'),
(7, 'Animation'),
(8, 'Fantasy');

INSERT INTO movies (movieID, title, description, poster, rating) VALUES
(1, 'Venom', 'Venom tells the story of a journalist who becomes the host of an alien symbiote, giving him superhuman abilities.', 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/venom-the-last-dance-et00383474-1729596212.jpg', 4.8),
(2, 'John Wick', 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.', 'https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg', 5.0),
(3, 'Batman', 'The Batman follows the caped crusader as he uncovers corruption in Gotham City while pursuing justice.', 'https://cdn.europosters.eu/image/750/posters/the-batman-downpour-i123456.jpg', 5.0),
(4, 'Deadpool', 'Deadpool is a comedic anti-hero who embarks on a quest for revenge after a rogue experiment leaves him disfigured.', 'https://lumiere-a.akamaihd.net/v1/images/image_8c4aa72b.jpeg?region=0%2C0%2C800%2C1200', 4.2),
(5, 'The Lord of the Rings', 'A hobbit embarks on a quest to destroy a powerful ring and save Middle-earth from evil forces.', 'https://upload.wikimedia.org/wikipedia/en/8/87/Ringstrilogyposter.jpg', 4.9),
(6, 'The Lion King', 'A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.', 'https://m.media-amazon.com/images/I/51NxI2WhVlL._AC_UF1000,1000_QL80_.jpg', 4.8);


INSERT INTO movies (movieID, title, description, poster, rating) VALUES
(7, 'The Meg 2', 'A massive underwater adventure where a team faces a prehistoric megalodon.', 'https://m.media-amazon.com/images/M/MV5BOGNiOTFkYTUtMDdiMi00YmJlLTkzOTAtMGViYWRhZjY3ODhkXkEyXkFqcGc@._V1_.jpg', 4.3),
(8, 'Thor (2011)', 'The origin story of Thor, the Norse God of Thunder, as he learns humility and becomes worthy of his power.', 'https://m.media-amazon.com/images/M/MV5BNjRhNGZjZjEtYTQzYS00OWUxLThjNGEtMTIwMTE2ZDFlZTZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 4.7),
(9, 'Alien', 'A spaceship crew encounters a deadly extraterrestrial creature while investigating a distress signal.', 'https://i0.wp.com/peaceandloveandveggies.com/wp-content/uploads/2024/07/mv5bmdu0njcwogqtnjnjos00nzq3lwiwm2ytywvmodzjmzqzn2exxkeyxkfqcgc406624235246260119931.jpg?ssl=1', 4.9),
(10, 'Avatar: The Way of Water', 'The story continues as Jake Sully and Neytiri fight to protect their family and planet Pandora.', 'https://images.moviesanywhere.com/7fbdd5c310d10623af2d040a726c4447/850a4464-275c-458f-a26a-fa6fdd4ab18c.jpg', 4.8);


INSERT INTO movie_categories (movieID, categoryID) VALUES
(1, 1), -- Venom: Action
(1, 2), -- Venom: Sci-Fi
(2, 1), -- John Wick: Action
(3, 1), -- Batman: Action
(3, 4), -- Batman: Adventure
(4, 1), -- Deadpool: Action
(4, 3), -- Deadpool: Comedy
(5, 4), -- The Lord of the Rings: Adventure
(5, 8), -- The Lord of the Rings: Fantasy
(6, 7), -- The Lion King: Animation
(6, 5); -- The Lion King: Drama

INSERT INTO movie_categories (movieID, categoryID) VALUES
(7, 1), -- The Meg 2: Action
(7, 4), -- The Meg 2: Adventure
(8, 1), -- Thor (2011): Action
(8, 4), -- Thor (2011): Adventure
(8, 8), -- Thor (2011): Fantasy
(9, 2), -- Alien: Sci-Fi
(9, 6), -- Alien: Horror
(10, 4), -- Avatar: The Way of Water: Adventure
(10, 8); -- Avatar: The Way of Water: Fantasy

drop view if exists MovieWithAllCategories
create view MovieWithAllCategories as 
SELECT 
        m.movieID, 
        m.title, 
        m.description, 
        STRING_AGG(c.name, ', ') AS 'categories',
        m.rating, 
        m.poster 
    FROM 
        movies AS m
    JOIN movie_categories AS mc ON m.movieID = mc.movieID
    JOIN categories AS c ON mc.categoryID = c.categoryID
    GROUP BY 
        m.movieID, m.title, m.description, m.rating, m.poster;

drop function if exists GetCategoryNameById
CREATE FUNCTION GetCategoryNameById
(
    @categoryID INT
)
RETURNS VARCHAR(100)
AS
BEGIN
    DECLARE @CategoryName VARCHAR(100);

    SELECT @CategoryName = c.name 
    FROM categories AS c
    WHERE c.categoryID = @categoryID;

    RETURN @CategoryName;
END
GO

DROP PROCEDURE IF EXISTS sp_GetMoviesInfo;
CREATE PROCEDURE sp_GetMoviesInfo
(
    @categoryID INT = NULL
)
AS
BEGIN
    DECLARE @categoryName VARCHAR(100) = dbo.GetCategoryNameById(@categoryID);

    SET NOCOUNT ON;

    SELECT * 
    FROM MovieWithAllCategories
    WHERE 
        (@categoryID IS NULL OR categories LIKE '%' + @categoryName + '%');
END

-- Create Category
CREATE PROCEDURE sp_CreateCategory
    @Name VARCHAR(100)
AS
BEGIN
    INSERT INTO Categories (Name)
    VALUES (@Name);
END

-- Read Categories
CREATE PROCEDURE sp_GetCategories
@categoryID int = null
AS
BEGIN
    SELECT * FROM Categories where (@categoryID IS NULL OR categoryID = @categoryID);
END

-- Update Category
CREATE PROCEDURE sp_UpdateCategory
    @CategoryID INT,
    @Name VARCHAR(100)
AS
BEGIN
    UPDATE Categories
    SET Name = @Name
    WHERE CategoryID = @CategoryID;
END

-- Delete Category
CREATE PROCEDURE sp_DeleteCategory
    @CategoryID INT
AS
BEGIN
    DELETE FROM Categories
    WHERE CategoryID = @CategoryID;
END

CREATE PROCEDURE sp_CreateMovie
    @title VARCHAR(150),
    @description VARCHAR(MAX),
    @poster VARCHAR(250),
    @rating DECIMAL(3, 2)
AS
BEGIN
    INSERT INTO movies (title, description, poster, rating)
    VALUES (@title, @description, @poster, @rating);
END;
GO

CREATE PROCEDURE sp_GetMovies
@movieId int = null
AS
BEGIN
    SELECT movieID, title, description, poster, rating FROM movies where (@movieId IS NULL OR movieID = @movieId);
END;
GO

CREATE PROCEDURE sp_UpdateMovie
    @movieID INT,
    @title VARCHAR(150),
    @description VARCHAR(MAX),
    @poster VARCHAR(250),
    @rating DECIMAL(3, 2)
AS
BEGIN
    UPDATE movies
    SET title = @title,
        description = @description,
        poster = @poster,
        rating = @rating
    WHERE movieID = @movieID;
END;
GO

CREATE PROCEDURE sp_DeleteMovie
    @movieID INT
AS
BEGIN
    DELETE FROM movies WHERE movieID = @movieID;
END;
GO