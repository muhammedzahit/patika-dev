-- 1
select city.city, country.country from city
left join country on city.country_id = country.country_id;

-- 2
select customer.first_name, customer.last_name from customer
right join payment on payment.customer_id = customer.customer_id;

-- 3
select customer.first_name, customer.last_name from rental
right join customer on rental.customer_id = customer.customer_id;