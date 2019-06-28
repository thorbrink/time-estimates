#!/bin/bash

echo "# Adding local user"
docker exec cc_hoganas_web wp eval-file composer_scripts/add-local-user/add-local-user.php
