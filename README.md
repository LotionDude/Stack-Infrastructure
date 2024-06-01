# Database Architecture
![image](https://github.com/LotionDude/Stack-Infrastructure/assets/51326751/59b87823-bf93-4ce5-8a5f-5512a1d2deff)

The DDL for initializing the database is located at the [./data/DDL.sql](./data/DDL.sql)

### Users
Table that holds the users. Currently only has the name of the user.

### Roles
Table that holds the different roles. Examples for roles include the `DEFAULT` role, `ADMIN` role, etc.

This table contains the `precedence` column which is used for determining which role has higher authority than other roles. An admin role, for example, would
have the highest precedence, compared to the default role with the lowest precedence.

### Actions
An action is pretty self explanatory - an action that a user can do in the application. Examples include `post message`, `post comment,` `manage permissions`, `manage others posts`, etc....

### Role Permissions
Table that holds an `N:1` relation to the `Actions` table and the `Roles` table. With this table, we'll be able to hold all the actions a certain role can do.

This table also contains the `state` property which can be of type `ENABLE | DISABLE | INHERIT`.
This means that a role is authorized to perform an action, unauthorized to perform an action, or it will inherit its permissions from a role lower in the hierarchy.

### User Roles
Table that holds an `N:1` relation to the `User` table and the `Roles` table. With this table, we'll be able to hold all the roles a user has.

# Explanation

With this architecture, you'll be able to get all the roles a user has and all the permissions a role has. When determining if
a user has a permission to perform a certain action, you will check the role with the highest precedence and check if the action performed
is `ENABLE` or `DISABLE` in the `role_permission` table. If it is of type `INHERIT`, it will check the next role in the order of precedence
to determine if it is permissible.
