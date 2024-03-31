-- Table: public.el_users

-- DROP TABLE IF EXISTS public.el_users;

CREATE TABLE IF NOT EXISTS public.el_users
(
    uid character varying(100) COLLATE pg_catalog."default",
    name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    created date,
    organization character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT el_users_pkey PRIMARY KEY (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.el_users
    OWNER to qwd_user;