(ns clj.core
  (:gen-class)
  (:require [clojure.data.json :as json]))

(defn pluck-attributes
  [obj]
  (hash-map 
    "id" (get obj "_id") 
    "full_name" (str (get-in obj ["_source" "first_name"]) " " (get-in obj ["_source" "last_name"]))
    "location" (get-in obj ["_source" "location"])))

(defn serialize-data
  [json-data]
  ((comp
    json/pprint
    (partial map pluck-attributes)
    json/read-str) json-data))

(defn -main
  [& args]
  (serialize-data (first args)))
