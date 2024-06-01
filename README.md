# Database Architecture
![image](https://github.com/LotionDude/Stack-Infrastructure/assets/51326751/59b87823-bf93-4ce5-8a5f-5512a1d2deff)

The DDL for initializing the database is located at the [./data/DDL.sql](./data/DDL.sql)

## Users
Table that holds the users. Currently only has the name of the user.

## Roles
Table that holds the different roles. Examples for roles include the `DEFAULT` role, `ADMIN` role, etc.

This table contains the `precedence` column which is used for determining which role has higher authority than other roles. An admin role, for example, would
have the highest precedence, compared to the default role with the lowest precedence.

## Actions
An action is pretty self explanatory - an action that a user can do in the application. Examples include `post message`, `post comment,` `manage permissions`, `manage others posts`, etc....

## Role Permissions
Table that holds an `N:1` relation to the `Actions` table and the `Roles` table. With this table, we'll be able to hold all the actions a certain role can do.

This table also contains the `state` property which can be of type `ENABLE | DISABLE | INHERIT`.
This means that a role is authorized to perform an action, unauthorized to perform an action, or it will inherit its permissions from a role lower in the hierarchy.

One edge case for this is making sure all roles have a row in this table for all actions. If a new action is added to the database, then this table won't even have default permissions
for that action, and manually adding a new row for each role is too time consuming. To solve this problem, the table has a `TRIGGER` that adds a new row in this table for each role that exists.
It will, by default, have a state of `INHERIT`. The exception of this is the `DEFAULT` role having it set to `DISABLE`, and the `ADMIN` role having it set to `ENABLE`. This means all roles will be unable to
perform this action (since they all `INHERIT` from the `DEFAULT` role which has it on the state of `DISABLE`), with the exception of the `ADMIN` role.

## User Roles
Table that holds an `N:1` relation to the `User` table and the `Roles` table. With this table, we'll be able to hold all the roles a user has.

# Explanation

With this architecture, you'll be able to get all the roles a user has and all the permissions a role has. When determining if
a user has a permission to perform a certain action, you will check the role with the highest precedence and check if the action performed
is `ENABLE` or `DISABLE` in the `role_permission` table. If it is of type `INHERIT`, it will check the next role in the order of precedence
to determine if it is permissible.
