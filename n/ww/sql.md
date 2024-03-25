# SQL Survival Guide

The recipes below is a hodge-podge of doings for MSSQL (mainly), PostgreSQL and MySQL.

## Select top 50 rows of all tables

```
EXEC sp_MSforeachtable 'select top(50) * from ?'
```

## Add column

```
ALTER TABLE [dbo].[SubscriptionProductVersions] ADD IsCreditRatingRequired BIT;
UPDATE [dbo].[SubscriptionProductVersions] SET IsCreditRatingRequired=0;
ALTER TABLE [dbo].[SubscriptionProductVersions] ALTER COLUMN IsCreditRatingRequired BIT NOT NULL;
```

## Remove column

```
ALTER TABLE [dbo].[AmortizedLoans] DROP COLUMN IsCancelled;
```

## Rename column

```
EXEC sp_rename 'old_table_name.[oldColumnName]', 'newColumnName', 'COLUMN'
```

## Copy column

```
update dbo.Table set customerBaseId = customerId where customerBaseId is null;
```

## Remove procedure

```
DROP (FUNCTION | PROCEDURE) [dbo].[GetAccountFirstConsumption];
```

## Rename table

```
sp_rename 'old_table_name', 'new_table_name'
```

## Constraints

```
ALTER TABLE [dbo].[XXX] NOCHECK CONSTRAINT ALL   -- disable constraints
ALTER TABLE [dbo].[XXX] CHECK CONSTRAINT ALL     -- enable constraints
```

## Drop foreign key

```
ALTER TABLE [dbo].[AccountTable] DROP FK_AccountTableParentId_AccountTableId
```

## Joins

### Inner join

Retrieves rows with matching values in both tables.

```
select * from A inner join B on A.key = B.key
```

![inner-join.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/inner-join.png)

### Left join

Retrieves all rows from A and matching rows from B.

```
select * from A left join B on A.key = B.key
```

![left-join.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/left-join.png)

### Left join with NULL check

Retrieves rows from A where there is no matching rows in B.

```
select * from A left join B on A.key = B.key where B.key is NULL
```

![left-join-with-null-check.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/left-join-with-null-check.png)

### Right join

Retrieves all rows from B and matching rows from A.

```
select * from A right join B on A.key = B.key
```

![right-join.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/right-join.png)

### Right join with NULL check

Retrieves rows from B where there is no matching rows in A.

```
select * from A right join B on A.key = B.key where A.key is NULL
```

![right-join-with-null-check.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/right-join-with-null-check.png)

### Full join

Retrieve all rows from both tables.

```
select * from A full outer join B on A.key = B.key
```

![full-join.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/full-join.png)

### Full join with NULL check

Retrieves rows from both tables ignoring where there is no match in either table.

```
select * from A full outer join B on A.key = B.key where A.key is NULL or B.key is NULL
```

![full-join-with-null-check.png](SQL%20Survival%20Guide%209d97c86f44c941a0856cc10a8ae1415c/full-join-with-null-check.png)