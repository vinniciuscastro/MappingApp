package com;
import com.example.demo.GoogleMapsService;
import org.springframework.boot.web.client.RestTemplateBuilder;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MapApplication extends JFrame {
    private GoogleMapsService googleMapsService;
    private JButton geocodeButton;
    private JButton clearButton;
    private JTextField inputText;
    private JTextArea responseArea;

    public MapApplication() {
        setTitle("Map Application");
        setSize(800, 600);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        initUI();
    }

    private void initUI() {
        googleMapsService = new GoogleMapsService(new RestTemplateBuilder());
        inputText = new JTextField("Enter a location");
        geocodeButton = new JButton("Geocode");
        clearButton = new JButton("Clear");
        responseArea = new JTextArea();
        responseArea.setEditable(false);

        JPanel panel = new JPanel(new GridLayout(0, 1));
        panel.add(inputText);
        panel.add(geocodeButton);
        panel.add(clearButton);
        panel.add(new JScrollPane(responseArea));

        geocodeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                geocode(inputText.getText());
            }
        });

        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                clear();
            }
        });

        add(panel, BorderLayout.NORTH);
    }

//    private void geocode(String location) {
//        // Implement geocoding logic here
//        // For example, call a geocoding service and update the map and responseArea
//        responseArea.setText("Geocode results for: " + location);
//    }
    private void geocode(String location) {
    try {
        GeocodeResponse.Location coordinates = googleMapsService.getCoordinatesForAddress(location);
        responseArea.setText("Latitude: " + coordinates.getLat() + "\nLongitude: " + coordinates.getLng());
    } catch (Exception ex) {
        responseArea.setText("Error: " + ex.getMessage());
        ex.printStackTrace();
    }
}

    private void clear() {
        responseArea.setText("");
    }

    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            MapApplication app = new MapApplication();
            app.setVisible(true);
        });
    }
}