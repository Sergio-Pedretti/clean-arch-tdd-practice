
create schema branas_store;

create table branas_store.product (
    id_product integer primary key,
    description text,
    price numeric,
    currency text
);

insert into branas_store.product (id_product, description, price, currency) values (1, 'Camera', 100, 'BRL');
insert into branas_store.product (id_product, description, price, currency) values (2, 'Gitarra', 500, 'BRL');
insert into branas_store.product (id_product, description, price, currency) values (3, 'Geladeira', 800, 'BRL');
insert into branas_store.product (id_product, description, price, currency) values (4, 'Produto Errado', 1000, 'BRL');
insert into branas_store.product (id_product, description, price, currency) values (5, 'Produto Frete Baixo', 1000, 'BRL');
insert into branas_store.product (id_product, description, price, currency) values (6, 'Livro Importado', 50, 'USD');


create table branas_store.coupon (
    code text primary key,
    percentage numeric,
    expiresIn timestamp
);

insert into branas_store.coupon(code, percentage, expiresIn) values ('SERGIO20', 20, '2024-12-02 20:00:00');
insert into branas_store.coupon(code, percentage, expiresIn) values ('EXPIRED15', 15, '2023-10-02 20:00:00');


create table branas_store.product_dimensions (
    dimension_id integer primary key,
    height numeric,
    width numeric,
    depth numeric,
    weight decimal(5,2),
    fk_product integer NOT NULL,
    FOREIGN KEY (fk_product) REFERENCES branas_store.product(id_product)
);

insert into branas_store.product_dimensions (dimension_id, height, width, depth, weight, fk_product) values (1, 20, 15, 10, 1, 1);
insert into branas_store.product_dimensions (dimension_id, height, width, depth, weight, fk_product) values (2, 100, 30, 10, 3, 2);
insert into branas_store.product_dimensions (dimension_id, height, width, depth, weight, fk_product) values (3, 200, 100, 50, 40, 3);
insert into branas_store.product_dimensions (dimension_id, height, width, depth, weight, fk_product) values (4, -200, -100, -50, 0, 4);
insert into branas_store.product_dimensions (dimension_id, height, width, depth, weight, fk_product) values (5, 100, 30, 20, 0.5, 5);
insert into branas_store.product_dimensions (dimension_id, height, width, depth, weight, fk_product) values (6, 20, 10, 3, 0.1, 6);

