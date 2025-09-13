package com.zhiwaruptech.bangapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends Activity {

    private TextView title;
    private Button btnQuran, btnPrayerTimes, btnMosque, btnTasbih, btnAudio;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        title = findViewById(R.id.title);
        btnQuran = findViewById(R.id.btn_quran);
        btnPrayerTimes = findViewById(R.id.btn_prayer_times);
        btnMosque = findViewById(R.id.btn_mosques);
        btnTasbih = findViewById(R.id.btn_tasbih);
        btnAudio = findViewById(R.id.btn_audio);

        title.setText("بەرنامەی ئیسلامی - BANG APP");

        btnQuran.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, QuranActivity.class));
            }
        });

        btnPrayerTimes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, PrayerTimesActivity.class));
            }
        });

        btnMosque.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, MosqueFinderActivity.class));
            }
        });

        btnTasbih.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, TasbihActivity.class));
            }
        });

        btnAudio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainActivity.this, AudioPlayerActivity.class));
            }
        });
    }
}