#!/bin/sh

# Redirect output to stderr.
exec 1>&2
# enable user input
exec < /dev/tty

consoleregexp='^\+.*console\.log\('
fooregexp='^\+.*foo'
testonlyregexp='^\+.*\.only(\(|\.)'

if test `git diff --cached | egrep $consoleregexp | wc -l` != 0
then
  exec git diff --cached | egrep "($consoleregexp|\+{3})"

  read -p "There are some 'console.log' calls in the diff. Do you want to continue? (y/n)" yn
  echo $yn | grep ^[Yy]$
  if [ $? -eq 0 ]
  then
    continue;
  else
    exit 1;
  fi
fi

if test `git diff --cached | egrep $fooregexp | wc -l` != 0
then
  exec git diff --cached | egrep "($fooregexp|\+{3})"

  read -p "There are some 'foo's in the diff. Do you want to continue? (y/n)" yn
  echo $yn | grep ^[Yy]$
  if [ $? -eq 0 ]
  then
    continue;
  else
    exit 1;
  fi
fi
