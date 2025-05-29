
git pull

# Permissions format:
# chmod XYZ <file or directory>

# Where:
#  X = permissions for the owner
#  Y = permissions for the group
#  Z = permissions for everyone else (others)

# Legend:
#  7 = rwx  (read, write, execute)
#  6 = rw-  (read, write)
#  5 = r-x  (read, execute)
#  4 = r--  (read only)
#  3 = -wx  (write, execute)
#  2 = -w-  (write only)
#  1 = --x  (execute only)
#  0 = ---  (no permissions)

echo "Setting folder permissions..."

# Setting ownership to my pi user so i can modify files.
sudo chown -R $USER:$USER .
sudh chmod 755 .

# Permission for postgres
sudo chmod 700 ./postgres/postgres_data

# Permission for django
chmod +x django/hosting/django_bash_command.sh
find django/staticfiles -type d -exec chmod 755 {} \; # rwx for each directory
find django/staticfiles -type f -exec chmod 644 {} \; # rw- for eachfile

# Permissions for Airflow (run as UID 50000, GID 0)
sudo chown -R 50000:0 airflow/dags airflow/logs airflow/plugins # Setting owner
sudo find airflow/dags airflow/logs airflow/plugins -type d -exec chmod 755 {} \; # rwx for each directory
sudo find airflow/dags airflow/logs airflow/plugins -type f -exec chmod 644 {} \; # rw for eachfile

echo "✅ Permissions fixed."
