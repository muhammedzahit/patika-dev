-- 1
SELECT DISTINCT replacement_cost from film;

-- 2
SELECT COUNT(DISTINCT replacement_cost) from film;

-- 3
SELECT COUNT(*) FROM film
WHERE (title LIKE 'T%') AND (rating = 'G');

-- 4
SELECT count(*) FROM country
WHERE country LIKE '______';

-- 5
SELECT COUNT(*) from city
WHERE city ILIKE '%r';