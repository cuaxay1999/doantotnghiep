<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInforsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('infors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('device_id');
            $table->string('ph', 20);
            $table->string('temperature', 20);
            $table->string('turbidity', 20);
            $table->string('do', 20);
            $table->string('bod', 20)->nullable();
            $table->string('cod', 20);
            $table->string('nh4', 20);
            $table->string('po4', 20);
            $table->string('tss', 20);
            $table->string('coliform', 20);
            $table->string('wqi', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('infors');
    }
}
