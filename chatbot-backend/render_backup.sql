--
-- PostgreSQL database dump
--

\restrict PEouDsvYk1EcK1QwyXwXb1CMTVh6ZHpvFoBWd33fTlWCJ20fAlPfz2Cg2Hl2PRY

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg12+1)
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: spiro_postgres_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO spiro_postgres_user;

--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: spiro_postgres_user
--

CREATE TABLE public.invoices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    payment_id uuid NOT NULL,
    invoice_number text NOT NULL,
    user_email text NOT NULL,
    user_name text,
    amount numeric(10,2) NOT NULL,
    currency text NOT NULL,
    status text DEFAULT 'draft'::text,
    pdf_url text,
    sent_at timestamp without time zone,
    due_date date,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.invoices OWNER TO spiro_postgres_user;

--
-- Name: payment_logs; Type: TABLE; Schema: public; Owner: spiro_postgres_user
--

CREATE TABLE public.payment_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    payment_id uuid NOT NULL,
    event_type text NOT NULL,
    status text,
    message text,
    response_data jsonb,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.payment_logs OWNER TO spiro_postgres_user;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: spiro_postgres_user
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_email text NOT NULL,
    user_name text,
    amount numeric(10,2) NOT NULL,
    currency text DEFAULT 'INR'::text NOT NULL,
    gateway text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    transaction_id text,
    invoice_number text,
    payment_method text,
    razorpay_order_id text,
    razorpay_payment_id text,
    stripe_payment_intent_id text,
    stripe_session_id text,
    description text,
    metadata jsonb,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    paid_at timestamp without time zone
);


ALTER TABLE public.payments OWNER TO spiro_postgres_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: spiro_postgres_user
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    password_hash text NOT NULL,
    first_name text,
    last_name text,
    full_name text,
    phone text,
    profile_picture text,
    company_name text,
    country text,
    bio text,
    is_verified boolean DEFAULT false,
    is_active boolean DEFAULT true,
    last_login timestamp without time zone,
    verification_token text,
    verification_token_expires timestamp without time zone,
    reset_token text,
    reset_token_expires timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO spiro_postgres_user;

--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: spiro_postgres_user
--

COPY public.invoices (id, payment_id, invoice_number, user_email, user_name, amount, currency, status, pdf_url, sent_at, due_date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payment_logs; Type: TABLE DATA; Schema: public; Owner: spiro_postgres_user
--

COPY public.payment_logs (id, payment_id, event_type, status, message, response_data, created_at) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: spiro_postgres_user
--

COPY public.payments (id, user_email, user_name, amount, currency, gateway, status, transaction_id, invoice_number, payment_method, razorpay_order_id, razorpay_payment_id, stripe_payment_intent_id, stripe_session_id, description, metadata, created_at, updated_at, paid_at) FROM stdin;
76f4b83a-850a-46ed-a1d3-50c91f5505e8	jaibloody@gmail.com	viyas test 1	100.00	USD	stripe	succeeded	pi_3T8GDdPJkDboqnPw0BJ0AXat	\N	\N	\N	\N	pi_3T8GDdPJkDboqnPw0BJ0AXat	cs_test_a1uqCeDK0wuelLE29hJqTJ9Zjs2CSxKgJ4ws7D8q0VRuggpUs2OsUb2qMz	Payment for Optical Long Haul	{"created_at": "2026-03-07T08:28:10.383Z", "payment_ref": "spiro_1772872090057_p95daupas", "service_type": "Optical Long Haul"}	2026-03-07 08:28:10.390971	2026-03-07 08:28:19.111089	2026-03-07 08:28:19.111089
b79a4875-3179-4b10-bf9a-b2857a8556a3	theepannkl2006@gmail.com	THEEPAN	100.00	USD	stripe	succeeded	pi_3T8E68PJkDboqnPw1gt2gxH6	\N	\N	\N	\N	pi_3T8E68PJkDboqnPw1gt2gxH6	cs_test_a183HKFsw7KEoqeABbmqUmAUeTgw5vGqkYlNxM6MhvHtOgRVHIhs2HgDGx	Payment for Consulting & Design	{"created_at": "2026-03-07T06:12:12.707Z", "payment_ref": "spiro_1772863932333_do5fgdp40", "service_type": "Consulting & Design"}	2026-03-07 06:12:12.714777	2026-03-07 06:12:25.912525	2026-03-07 06:12:25.912525
45b514ba-a3be-4dca-89f8-fc3a181f6770	theepannkl2006@gmail.com	suganth	1.00	USD	stripe	succeeded	pi_3T8EOFPJkDboqnPw0XBmuoOh	\N	\N	\N	\N	pi_3T8EOFPJkDboqnPw0XBmuoOh	cs_test_a1bhwyXA2R7v0ayU1Uys2G5A02Y3yNomw9xDslWK3xfA2lCdEud2F1PCEO	Payment for WiFi Network	{"created_at": "2026-03-07T06:30:56.887Z", "payment_ref": "spiro_1772865056588_bvq7vxcsn", "service_type": "WiFi Network"}	2026-03-07 06:30:56.894415	2026-03-07 06:31:09.769938	2026-03-07 06:31:09.769938
eec84872-0757-4459-b37e-8466a6e7ee61	theepannkl2006@gmail.com	spiro-postgres	12.00	USD	stripe	succeeded	pi_3T8G1wPJkDboqnPw0OKuZjkn	\N	\N	\N	\N	pi_3T8G1wPJkDboqnPw0OKuZjkn	cs_test_a1aSkMhYYhS3GsErP8ZXBQgY3lR7f0sShxk2fIE0uQeCUmwEmEt6dSL7vX	Payment for Microwave Network	{"created_at": "2026-03-07T08:15:42.872Z", "payment_ref": "spiro_1772871342517_yrt14bqqk", "service_type": "Microwave Network"}	2026-03-07 08:15:42.890084	2026-03-07 08:16:14.632677	2026-03-07 08:16:14.632677
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: spiro_postgres_user
--

COPY public.users (id, email, username, password_hash, first_name, last_name, full_name, phone, profile_picture, company_name, country, bio, is_verified, is_active, last_login, verification_token, verification_token_expires, reset_token, reset_token_expires, created_at, updated_at) FROM stdin;
ec16917f-0dbc-4b64-93e2-5c1625b31a7f	theepannkl2006@gmail.com	theepu	957b46c459d0233e626614446d413c161988499df8958fa08326fad61f8b8ca8	Theepan	S.S	Theepan S.S	+918056636309	\N	nodal wire	India	\N	f	t	\N	\N	\N	\N	\N	2026-03-07 08:24:39.813641	2026-03-07 08:24:39.813641
\.


--
-- Name: invoices invoices_invoice_number_key; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_invoice_number_key UNIQUE (invoice_number);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: payment_logs payment_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.payment_logs
    ADD CONSTRAINT payment_logs_pkey PRIMARY KEY (id);


--
-- Name: payments payments_invoice_number_key; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_invoice_number_key UNIQUE (invoice_number);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: payments payments_transaction_id_key; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_transaction_id_key UNIQUE (transaction_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_invoices_email; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_invoices_email ON public.invoices USING btree (user_email);


--
-- Name: idx_invoices_payment_id; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_invoices_payment_id ON public.invoices USING btree (payment_id);


--
-- Name: idx_payment_logs_payment_id; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_payment_logs_payment_id ON public.payment_logs USING btree (payment_id);


--
-- Name: idx_payments_email; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_payments_email ON public.payments USING btree (user_email);


--
-- Name: idx_payments_gateway; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_payments_gateway ON public.payments USING btree (gateway);


--
-- Name: idx_payments_status; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_payments_status ON public.payments USING btree (status);


--
-- Name: idx_users_created_at; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_users_created_at ON public.users USING btree (created_at);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_users_is_active; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_users_is_active ON public.users USING btree (is_active);


--
-- Name: idx_users_username; Type: INDEX; Schema: public; Owner: spiro_postgres_user
--

CREATE INDEX idx_users_username ON public.users USING btree (username);


--
-- Name: invoices invoices_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE CASCADE;


--
-- Name: payment_logs payment_logs_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: spiro_postgres_user
--

ALTER TABLE ONLY public.payment_logs
    ADD CONSTRAINT payment_logs_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE CASCADE;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT wal_buffers_full bigint, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT parallel_workers_to_launch bigint, OUT parallel_workers_launched bigint, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT wal_buffers_full bigint, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT parallel_workers_to_launch bigint, OUT parallel_workers_launched bigint, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO spiro_postgres_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO spiro_postgres_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO spiro_postgres_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO spiro_postgres_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO spiro_postgres_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO spiro_postgres_user;


--
-- PostgreSQL database dump complete
--

\unrestrict PEouDsvYk1EcK1QwyXwXb1CMTVh6ZHpvFoBWd33fTlWCJ20fAlPfz2Cg2Hl2PRY

