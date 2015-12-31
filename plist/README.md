# Description
Generate same data sets as plist for consumption in iOS application

# Data description

```xml
<array>
        <array>
                <string>P601</string>
                <string>20640</string>
                <string>21000</string>
                <string>1</string>
                <string>2</string>
                <string>1</string>
                <string>s</string>
        </array>
        ...
</array>
```

## Data map

* [0]: Train ID
* [1]: Departure time in seconds
* [2]: Arrival time in seconds
* [3]: Schedule ID (1 for weekday and 2 for weekend)
* [4]: Departure station ID
* [5]: Arrival station ID
* [6]: Direction (n for northbound and s for southbound)
