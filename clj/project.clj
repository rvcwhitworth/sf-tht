(defproject clj "0.1.0-SNAPSHOT"
  :description "Serializes Elasticsearch results for better readability"
  :dependencies [[org.clojure/clojure "1.8.0"] [org.clojure/data.json "0.2.6"]]
  :main ^:skip-aot clj.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
