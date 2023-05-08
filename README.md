# Docker  + Laravel 8.75 + ReactJS 18.2.0 + CoreUI Admin

This project has Laravel 8.75, ReactJS 18.2.0 and CoreUI Admin:

- [Docker](https://www.docker.com/)
- [Laravel](https://laravel.com/docs/).
- [ReactJS](https://react.dev/).
- [CoreUI Admin](https://coreui.io/product/free-react-admin-template/).


## Build Docker

Build App imagem docker:

    docker-compose build

Run App docker:

    docker-compose up -d

## Configuration for Develop

Run debug server laravel:

    docker-compose exec laravel sh -c "php artisan serve --host=0.0.0.0 --port=8000"

Run debug and hot reload reactJS:

    docker-compose exec laravel sh -c "npm run hot"


## Execução via .sh

Primeiro instale o tmux:

    sudo apt install tmux

Depois certifique que o arquivo "dev-tool.sh" tem permissão de execução:

    chmod +x dev-tool.sh

Agora basta executar o script de inicialização:

    ./dev-tool.sh
