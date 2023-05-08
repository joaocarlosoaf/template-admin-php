#!/bin/bash

tmux new-session -d -s intelliform_session 'docker-compose up'
tmux split-window -v -t intelliform_session 'sleep 5; docker-compose exec laravel sh -c "php artisan serve --host=0.0.0.0 --port=8000"'
tmux split-window -h -t intelliform_session:0.1 'sleep 5; docker-compose exec laravel sh -c "npm run hot"'
tmux select-layout -t intelliform_session even-vertical
tmux resize-pane -t intelliform_session:0.0 -y 50%
tmux attach-session -t intelliform_session
