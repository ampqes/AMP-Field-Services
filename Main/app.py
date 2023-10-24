from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Your data storage (in-memory lists for simplicity)
jobs = []
companies = []
contacts = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_job', methods=['POST'])
def add_job():
    data = request.form.to_dict()
    jobs.append(data)
    return jsonify({'success': True})

@app.route('/add_company', methods=['POST'])
def add_company():
    data = request.form.to_dict()
    companies.append(data)
    return jsonify({'success': True})

@app.route('/add_contact', methods=['POST'])
def add_contact():
    data = request.form.to_dict()
    contacts.append(data)
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
