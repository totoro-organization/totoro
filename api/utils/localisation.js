module.exports = {
	getNearestTerminal: function (terminals, coordinates) {
		let nearest = {
			id: terminals[0].id,
			distance: module.exports.distance(
				{
					longitude: terminals[0].longitude,
					latitude: terminals[0].latitude,
				},
				coordinates
			),
		};
		for (const terminal of terminals) {
			const localisation = {
				longitude: terminal.longitude,
				latitude: terminal.latitude,
			};
			const distance = module.exports.distance(localisation, coordinates);
			if (distance < nearest.distance) {
				nearest = {
					id: terminal.id,
					distance,
				};
			}
		}
		return nearest;
	},
	distance: function (localisation1, localisation2) {
		if (
			localisation1.latitude == localisation2.latitude &&
			localisation1.longitude == localisation2.longitude
		) {
			return 0;
		} else {
			var radlat1 = (Math.PI * localisation1.latitude) / 180;
			var radlat2 = (Math.PI * localisation2.latitude) / 180;
			var theta = localisation1.longitude - localisation2.longitude;
			var radtheta = (Math.PI * theta) / 180;
			var dist =
				Math.sin(radlat1) * Math.sin(radlat2) +
				Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = (dist * 180) / Math.PI;
			dist = dist * 60 * 1.1515;

			return dist;
		}
	},
};
