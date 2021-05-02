package com.devcix.backend_comisaria_jlo.utils;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import java.lang.reflect.Type;
import java.sql.Time;

public class TimeSerializer implements JsonDeserializer<Time>, JsonSerializer<Time> {

    @Override
    public Time deserialize(JsonElement json, Type type, JsonDeserializationContext jdc) throws JsonParseException {
        return Time.valueOf(json.getAsString());
    }

    @Override
    public JsonElement serialize(Time src, Type type, JsonSerializationContext jsc) {
        return new JsonPrimitive(src.getHours() + ":" + src.getMinutes() + ":" + src.getSeconds());
    }

}
