package com.rd.rdtracker;

import javax.json.Json;
import javax.json.stream.JsonGenerator;

public class JsonBuilder {
	
	public static void main(String[] args){
		buildJson();
	}

	private static void buildJson() {
		JsonGenerator generator = Json.createGenerator(System.out);
		generator.writeStartObject().write("sas", "asa").writeEnd().close();	
	}
}
