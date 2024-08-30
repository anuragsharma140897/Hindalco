import { SET_CONFIG_JSON, SET_INPUT_JSON, SET_OUTPUT_JSON, SET_MAPPER_API_JSON } from "../../action/editor/editor-action";

const initialState = {
    apiJson:{},
    inputJson: {
        "fq": "155Hz",
        "ip1": "192",
        "port1": "9090",
        "config": {
            "port1": "hdmi",
            "frq": {
                "enable": 'aalu',
                "noOfPorts": {
                    "iprange": [
                        { "start": "192.168.0.0" },
                        { "end": "172.168.0.0" }
                    ]
                }
            }
        }
    },
    config: {
        frequency: 'fq',
        ip: 'ip1',
        port: 'port1',
        hdmiPort: 'config.port1',
        aalu: "config.frq.enable",
        iprange: "config.frq.noOfPorts.iprange",
        ipStart: "config.frq.noOfPorts.iprange[0].start",
        ipEnd: "config.frq.noOfPorts.iprange[1].end",
    },
    outputJson: {},
    timestamp: Date.now()
}

const EditorReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MAPPER_API_JSON:
            return ({ ...state, apiJson: action.value, timestamp: Date.now() })
        case SET_INPUT_JSON:
            return ({ ...state, inputJson: action.value, timestamp: Date.now() })
        case SET_OUTPUT_JSON:
            return ({ ...state, outputJson: action.value, timestamp: Date.now() })
        case SET_CONFIG_JSON:
            return ({ ...state, finalJson: action.value, timestamp: Date.now() })
        default:
            return state;
    }
}

export default EditorReducer;