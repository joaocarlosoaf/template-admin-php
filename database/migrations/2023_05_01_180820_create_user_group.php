<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddUserGroup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_groups', function (Blueprint $table) {
            $table->id();
            $table->string('id');
            $table->string('name');
            $table->timestamps();
        });
        DB::table('user_groups')->insert(
            array(
                'name' => 'admin'
            ),
            array(
                'name' => 'user'
            )
        );
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('user_group_id')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_groups');
    }
}
