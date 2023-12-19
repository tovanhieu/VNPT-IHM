
/*
 GW一覧表
*/

var sample_gw1 = {
    "mxId": "example-mx-gw-001",
    "connection": "active",
    "lastActive": "2019-03-27T01:13:56Z",
    "register": "2019-03-27T01:13:56Z",
    "description": "Description about this child MX."
}

var sample_gw2 = {
    "mxId": "example-mx-gw-002",
    "connection": "inactive",
    "lastActive": "2019-03-27T01:13:56Z",
    "register": "2019-03-27T01:13:56Z",
    "description": "Description about this child MX."
}


const sample_active_gw1 = {
    "mxId": "mx-gw-001",
    "connection": "active",
    "lastActive": "2019-03-27T01:13:56Z",
    "register": "2019-03-27T01:13:56Z",
    "description": "Description about this child MX."
}

/*
 デバイス情報 GW1配下のデバイス情報
*/
var sample_gw1_device1 = {
    "id": "PulsarGum-3e:ea:11:e9:b2",
    "rssi": -69,
    "uCode": "00001C0000000000002402F0000008F5",
    "address": "c5:7e:e3:9c:fa:d1",
    "connectable": false,
    "uCodeVersion": 4,
    "addressType": "random",
    "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
    "serviceUuids": ["fe8c"],
    "EvType": "Bt:Dev:alive",
    "state": "active"
}

var sample_gw1_device2 = {
    "id": "PulsarGum-93:3d:87:bd:63",
    "state": "inactive",
}

var sample_gw1_device3 = {
    "id": "lora-uart-00010000102D",
    "humidity-ext-0": 57,
    "temperature-ext-0": 26.3,
    "illumination-ext-0": 411,
    "UV-ext-0": 1.1,
    "air_pressure-ext-0": 1005,
    "update-time": "Sun May 26 16:22:57 JST 2019",
    "state": "active"
}

var sample_gw1_device4 = {
    "id": "PulsarGum-f8:69:26:7f:ab:70",
    "rssi": -60,
    "uCode": "00001C0000000000002402F0000008F7",
    "address": "c5:7e:e3:9c:fa:d1",
    "connectable": false,
    "uCodeVersion": 4,
    "addressType": "random",
    "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
    "serviceUuids": ["fe8c"],
    "EvType": "Bt:Dev:alive",
    "state": "active"
}

var sample_gw1_device5 = {
    "id": "PulsarGum-c8:56:49:af:4f:aa",
    "rssi": -65,
    "uCode": "00001C0000000000002402F0000008F8",
    "address": "c5:7e:e3:9c:fa:d1",
    "connectable": false,
    "uCodeVersion": 4,
    "addressType": "random",
    "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
    "serviceUuids": ["fe8c"],
    "EvType": "Bt:Dev:alive",
    "state": "active"
}

var sample_gw1_device6 = {
    "id": "PulsarGum-c5:7e:e3:9c:fa:d1",
    "rssi": -65,
    "uCode": "00001C0000000000002402F0000008F9",
    "address": "c5:7e:e3:9c:fa:d1",
    "connectable": false,
    "uCodeVersion": 4,
    "addressType": "random",
    "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
    "serviceUuids": ["fe8c"],
    "EvType": "Bt:Dev:alive",
    "state": "active"
}

var sample_gw1_device7 = {
    "id": "PulsarGum-f4:f6:0a:65:dd:04",
    "rssi": -68,
    "uCode": "00001C0000000000002402F0000008F0",
    "address": "c5:7e:e3:9c:fa:d1",
    "connectable": false,
    "uCodeVersion": 4,
    "addressType": "random",
    "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
    "serviceUuids": ["fe8c"],
    "EvType": "Bt:Dev:alive",
    "state": "active"
}


var sample_gw1_device8 = {
    "id": "usb-FTDI_FT232R_USB_UART_AL2W4DFZ-if00-port0",
    "tdId": "example-td-id",
    "type": "device",
    "authState": "undetected",
    "specifier": {
        "hardwareAddress": "5678901234AB",
        "ip4Address": "192.168.0.8",
        "optionalInfo": {
            "property1": "string",
            "property2": "string"
        }
    },
    "state": "active",
}

var sample_gw1_device9 = {
    "id": "PulsarGum-fd:2c:04:85:18:f1",
    "rssi": -70,
    "uCode": "00001C0000000000002402F000000FFF",
    "address": "c5:7e:e3:9c:fa:d1",
    "connectable": false,
    "uCodeVersion": 4,
    "addressType": "random",
    "serviceData": { "fe8c": [4, 245, 8, 0, 0, 240, 2, 36, 0, 0, 0, 0, 0, 0, 28, 0, 0] },
    "serviceUuids": ["fe8c"],
    "EvType": "Bt:Dev:alive",
    "state": "active"
}

const preRegisteredCandidateList = [
    "PulsarGum-f8%3A69%3A26%3A7f%3Aab%3A70",
    "PulsarGum-c8%3A56%3A49%3Aaf%3A4f%3Aaa",
]