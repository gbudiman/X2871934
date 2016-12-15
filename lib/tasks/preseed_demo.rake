namespace :preseed_demo do
  task rebuild: :environment do
    Image.destroy_all
    
    Image.slurp path: Rails.root.join('db', 'raw_seeds', 'query_set.txt').to_s,
                category: Image.categories[:query]
    Image.slurp path: Rails.root.join('db', 'raw_seeds', 'retrieval_set.txt').to_s,
                category: Image.categories[:retrieve]
    Precomputed.slurp path: Rails.root.join('db', 'raw_seeds', 'matching.txt').to_s
  end
end
