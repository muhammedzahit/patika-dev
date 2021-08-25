-- 1
select city.city, country.country from city
join country on country.country_id = city.country_id;

-- 2
select first_name, last_name from payment
join customer on customer.customer_id = payment.customer_id;

-- 3
select first_name, last_name from rental
join customer on customer.customer_id = rental.customer_id;